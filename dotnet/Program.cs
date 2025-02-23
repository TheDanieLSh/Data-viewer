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

    string payload = await streamReader.ReadToEndAsync();

    string content;
    string? contentType;

    if (context.Request.Headers.ContentType != "text/plain")
    {
        content = payload;
        contentType = context.Request.Headers.ContentType;

        goto FileProcess;
    }

    HttpResponseMessage resp = await HTTP.GetAsync(payload);

    Console.WriteLine("Server fetched data");

    content = await resp.Content.ReadAsStringAsync();
    contentType = resp.Content.Headers.ContentType?.MediaType;

    FileProcess:

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

        await context.Response.WriteAsync($"Failed to fetch {payload}. Output file is empty");

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
    Dictionary<string, object> dict = [];

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
