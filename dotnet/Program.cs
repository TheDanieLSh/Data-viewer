using System.Text.Json;
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

    return Results.Text(outputFile, "application/json");
});

app.Run();


Dictionary<string, object> XmlToDictionary(XElement element)
{
    var dict = new Dictionary<string, object>();

    foreach (var node in element.Elements())
    {
        if (node.HasElements)
        {
            // Проверка, существует ли уже ключ
            if (dict.ContainsKey(node.Name.LocalName))
            {
                // Если ключ уже существует, превращаем значение в список
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
            // Обработка текстовых значений и атрибутов
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
