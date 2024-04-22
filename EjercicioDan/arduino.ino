String uuid = "A";

#define DEBUG false

int button = 13;
int counter = 0;

void setup() {  
  setPinMode();
  Serial.begin(9600);
  delay(1000);

  #if (DEBUG)
    Serial.println(uuid + ":RUNNING_DEV_MODE");
  #else
    Serial.println(uuid + ":RUNNING_PROD_MODE");
  #endif
    Serial.flush();
}

void setPinMode() {
  pinMode(button, INPUT);
}

void loop() {

  if ( digitalRead(button) == HIGH) { 
          counter = counter + 1;
          Serial.println("COUNTER:" + String(counter));
  }

  if (Serial.available()) {
    Serial.flush();
    String message = Serial.readStringUntil('\n');
    message.trim();
    if (message == '\n' || message.equals("")) {
      return;
    }

    #if (DEBUG)
      Serial.println("A<::" + message);
    #endif

    if ( digitalRead(button) == HIGH) { 
          counter = counter + 1;
          Serial.println("COUNTER:" + String(counter));      
          Serial.flush();
    }

    delay(200);
  }
  delay(200);
}