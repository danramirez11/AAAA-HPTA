#define DEBUG false
String uuid = "A";


void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);

  #if (DEBUG)
    Serial.println(uuid + ":RUNNING_DEV_MODE");
  #else
    Serial.println(uuid + ":RUNNING_PROD_MODE");
  #endif
    Serial.flush();
}

void loop() {
  int light = analogRead(A0);
  Serial.println(uuid + ":LIGHT:" + String(light));

  if (Serial.available()) {
    Serial.flush();
    String message = Serial.readStringUntil('\n');
    message.trim();
    if (message == '\n' || message.equals("")) {
      return;
    }

    Serial.println("LIGHTLEVEL:" + String(light));
    delay(100);
  }

  delay(2000);
}