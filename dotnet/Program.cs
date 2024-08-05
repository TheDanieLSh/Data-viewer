using System.Text.Json;
using System.Net.Http;
using System.Xml;
using System.Xml.Linq;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var HTTP = new HttpClient();

app.MapGet("/", () => "Successfull response from server!");

app.MapPost("/file_process", async (HttpRequest req) =>
{
    Console.WriteLine("Got a file process request");

    string outputFile = "";

    using var streamReader = new StreamReader(req.Body);

    string link = await streamReader.ReadToEndAsync();

    Console.WriteLine("Start fetching data");

    HttpResponseMessage resp = await HTTP.GetAsync(link);

    if (resp.Content.Headers.ContentType?.MediaType == "application/json")
    {
        string json = await resp.Content.ReadAsStringAsync();

        outputFile = json;

    } else if (resp.Content.Headers.ContentType?.MediaType == "text/xml")
    {

        string xml = await resp.Content.ReadAsStringAsync();

        var xDoc = XDocument.Parse(xml);

        string json = JsonSerializer.Serialize(XmlToDictionary(xDoc.Root));

        outputFile = json;
    }

    if (String.IsNullOrEmpty(outputFile))
    {
        return $"Failed to fetch {link}";
    }

    Console.WriteLine("Sending the result to client");

    return outputFile;
});

app.Run();
