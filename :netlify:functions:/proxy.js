const fetch = require("node-fetch");

exports.handler = async function(event, context) {

  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      }
    };
  }

  try {
    const body = JSON.parse(event.body);

    const googleResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbzrcp42cLgTrdttpe2XQds6RoLXJAcyHQUIItt2huaV6triutQGoaQpo2RwCiK_siIlSQ/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );

    const text = await googleResponse.text();
    let json;

    try {
      json = JSON.parse(text);
    } catch {
      json = { success: false, message: "Invalid JSON from Apps Script" };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(json)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: String(err) })
    };
  }
};
