using System.Text.Json;
using System.Net.Http;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var HTTP = new HttpClient();

app.MapGet("/", () => "Successfull response from server!");

app.MapPost("/file_process", async (HttpRequest req) =>
{
    Console.WriteLine("Got a file process request");

    bool isXML = false;

    using var streamReader = new StreamReader(req.Body);

    string link = await streamReader.ReadToEndAsync();

    Console.WriteLine("Start fetching data");

    HttpResponseMessage resp = await HTTP.GetAsync(link);

    if (resp.Content.Headers.ContentType?.MediaType == "application/json")
    {
        string json = await resp.Content.ReadAsStringAsync();
        return json;
    } else if (resp.Content.Headers.ContentType?.MediaType == "text/xml")
    {
        //do some stuff
    }
    return $"Failed to fetch {link}";
});

app.Run();
