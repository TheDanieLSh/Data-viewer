using System.Text.Json;
using System.Xml.Linq;

// ��������� �������

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowForAll",
        builder =>
        {
            builder.WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod();
        }
        );
});

var app = builder.Build();
app.UseCors("AllowForAll");

HttpClient HTTP = new();

// ��������� ������

app.MapGet("/", () => "Successfull response from server!");

app.MapPost("/file_process", async (HttpContext context) =>
{
    Console.WriteLine("Got a file process request");

    string outputFile = "";

    using StreamReader streamReader = new(context.Request.Body);

    string link = await streamReader.ReadToEndAsync();

    HttpResponseMessage resp = await HTTP.GetAsync(link);

    Console.WriteLine("Server fetched data");

    string content = await resp.Content.ReadAsStringAsync();
    var contentType = resp.Content.Headers.ContentType?.MediaType;

    if (contentType == "application/json")
    {
        outputFile = content;

    } else if (contentType == "text/xml" || contentType == "application/xml")
    {
        XDocument xDoc = XDocument.Parse(content);

        string json = JsonSerializer.Serialize(XmlToDictionary(xDoc.Root));

        outputFile = json;
    }

    if (String.IsNullOrEmpty(outputFile))
    {
        context.Response.ContentType = "text/plain";

        await context.Response.WriteAsync($"Failed to fetch {link}. Output file is empty");

        return;
    }

    context.Response.ContentType = "application/json";

    Console.WriteLine("Sending the result to client");

    await context.Response.WriteAsync(outputFile);
});

app.Run();

// ����������� �������
Dictionary<string, object> XmlToDictionary(XElement element)
{
    var dict = new Dictionary<string, object>();

    foreach (var node in element.Elements())
    {
        if (node.HasElements)
        {
            // ��������, ���������� �� ��� ����
            if (dict.ContainsKey(node.Name.LocalName))
            {
                // ���� ���� ��� ����������, ���������� �������� � ������
                if (dict[node.Name.LocalName] is List<object> list)
                {
                    list.Add(XmlToDictionary(node));
                }
                else
                {
                    dict[node.Name.LocalName] = new List<object> { dict[node.Name.LocalName], XmlToDictionary(node) };
                }
            }
            else
            {
                dict[node.Name.LocalName] = XmlToDictionary(node);
            }
        }
        else
        {
            // ��������� ��������� �������� � ���������
            if (dict.ContainsKey(node.Name.LocalName))
            {
                if (dict[node.Name.LocalName] is List<object> list)
                {
                    list.Add(node.Value);
                }
                else
                {
                    dict[node.Name.LocalName] = new List<object> { dict[node.Name.LocalName], node.Value };
                }
            }
            else
            {
                dict[node.Name.LocalName] = node.Value;
            }
        }
    }

    return dict;
}
