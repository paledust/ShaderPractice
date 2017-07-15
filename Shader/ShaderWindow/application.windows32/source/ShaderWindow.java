import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class ShaderWindow extends PApplet {

PShader shader;

public void setup() {
  
  noStroke();

  shader = loadShader("shader.frag");
}

public void draw() {
  shader.set("u_resolution", PApplet.parseFloat(width), PApplet.parseFloat(height));
  shader.set("u_mouse", PApplet.parseFloat(mouseX), PApplet.parseFloat(mouseY));
  shader.set("u_time", millis() / 1000.0f);
  shader(shader);
  rect(0,0,width,height);
}
  public void settings() {  size(640, 640, P2D); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "ShaderWindow" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
