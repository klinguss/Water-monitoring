#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#define WIFI_SSID "Nylaaaaaa"
#define WIFI_PASSWORD "mangcuatiennu"
#define API_KEY "AIzaSyCWTB34t3DEm_5h1rROwE-tbtbFjz809iw"
#define DATABASE_URL "https://lowtech-77567-default-rtdb.asia-southeast1.firebasedatabase.app/"

#define USER_EMAIL "khanhlinhtruong456@gmail.com"
#define USER_PASSWORD "ws11330215123"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

String uid;
String databasePath;
String turbidityPath;
String phPath;
String tdsPath;

const int turbidityPin = 33;
const int phPin = 32;
const int tdsPin =35;

unsigned long sendDataPrevMillis = 0; // Variable to store the last time data was sent
unsigned long timerDelay = 60000; // 1 minute in milliseconds

void initWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  Serial.println();
}

void sendFloat(String path, float value) {
  if (Firebase.RTDB.setFloat(&fbdo, path.c_str(), value)) {
    Serial.print("Writing value: ");
    Serial.print(value);
    Serial.print(" on the following path: ");
    Serial.println(path);
    Serial.println("PASSED");
    Serial.println("PATH: " + fbdo.dataPath());
    Serial.println("TYPE: " + fbdo.dataType());
  } else {
    Serial.println("FAILED");
    Serial.println("REASON: " + fbdo.errorReason());
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(turbidityPin, INPUT);
  pinMode(phPin, INPUT);
  pinMode(tdsPin, INPUT);
  initWiFi();
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(4096);
  config.token_status_callback = tokenStatusCallback;
  config.max_token_generation_retry = 5;
  
  // Initialize Firebase
  Firebase.begin(&config, &auth);

  Serial.println("Getting User UID");
  while ((auth.token.uid) == "") {
    Serial.print('.');
    delay(1000);
  }

  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.println(uid);

  databasePath = "/UsersData/" + uid;
  turbidityPath = databasePath + "/turbidity";
  tdsPath = databasePath + "/tds";
  phPath = databasePath + "/pH"; // Corrected path name
}

void loop() {
  if (Firebase.ready() && (millis() - sendDataPrevMillis > timerDelay || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    int pHValue = analogRead(phPin);
    // Adjust the conversion formula based on your sensor characteristics
    // This is just an example formula
    float volt=pHValue*(3.3/4095.0);
    float ph=(3.3*volt);
    Serial.print("pH ");
    Serial.println(ph);
    sendFloat(phPath, ph);
//----------------------
    int turbidityValue = analogRead(turbidityPin);
  // Convert to NTU (example, adjust formula based on your sensor)
    float ntuValue = (turbidityValue / 1024.0) * 500.0;
  // Print to serial (debug)
    Serial.print("NTU value: ");
    Serial.println(ntuValue);
    sendFloat(turbidityPath, ntuValue);
//-------------------------
    int tdsValue = analogRead(tdsPin);
    float voltage = tdsValue * (5.0 / 1023.0);
    float tds = (133.42 * voltage * voltage * voltage) - (255.86 * voltage * voltage) + (857.39 * voltage);
    Serial.println("TDS");
    Serial.println(tds);
    sendFloat(tdsPath, tds);
  }
}

