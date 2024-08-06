using System.Text.Json;
using System.Xml.Linq;

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

app.MapGet("/", () => "Successfull response from server!");

app.MapPost("/file_process", async (HttpContext context) =>
{
    Console.WriteLine("Got a file process request");

    string outputFile = "";

    using var streamReader = new StreamReader(context.Request.Body);

    string link = await streamReader.ReadToEndAsync();

    Console.WriteLine("Start fetching data");

    HttpResponseMessage resp = await HTTP.GetAsync(link);

    if (resp.Content.Headers.ContentType?.MediaType == "application/json")
    {
        string json = await resp.Content.ReadAsStringAsync();

        outputFile = json;

        context.Response.ContentType = "application/json";

    } else if (resp.Content.Headers.ContentType?.MediaType == "text/xml")
    {

        string xml = await resp.Content.ReadAsStringAsync();

        XDocument xDoc = XDocument.Parse(xml);

        string json = JsonSerializer.Serialize(XmlToDictionary(xDoc.Root));

        outputFile = json;

        context.Response.ContentType = "application/json";
    }

    if (String.IsNullOrEmpty(outputFile))
    {
        context.Response.ContentType = "text/plain";

        await context.Response.WriteAsync($"Failed to fetch {link}");

        return;
    }

    Console.WriteLine("Sending the result to client");

    await context.Response.WriteAsync(outputFile);
});

app.Run();


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
