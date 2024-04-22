#define DEBUG false
String uuid = "A";

void setup() {
  Serial.begin(9600);
  pinMode(A4, INPUT);
  pinMode(A5, INPUT);

  #if (DEBUG)
    Serial.println(uuid + ":RUNNING_DEV_MODE");
  #else
    Serial.println(uuid + ":RUNNING_PROD_MODE");
  #endif
    Serial.flush();
}

void loop() {
  int X = analogRead(A4);
  int Y = analogRead(A5);
  Serial.println(String(X) + "," + String(Y));
  Serial.println("VALUES:" + String(X) + "," + String(Y));  

  if (Serial.available()) {
    Serial.flush();
    String message = Serial.readStringUntil('\n');
    message.trim();
    if (message == '\n' || message.equals("")) {
      return;
    }

    Serial.println("VALUES:" + String(X) + "," + String(Y));
    delay(100);
  }

  delay(20000);
}