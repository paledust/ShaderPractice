#ifdef GL_ES
precision mediump float;
#endif

#define M_PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 Brown = vec3(1.,0.,1.);
vec3 Yellow = vec3(1.,1.,0.);
vec3 Blue = vec3(0.,1.,1.);

float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  vec3 mixer = vec3(st.x);
  mixer.r = pcurve(st.x, 2.400,5.968);
  mixer.g = pcurve(st.x, 5.872,9.440);
  mixer.b = pcurve(st.x, 1.864,1.096);

  vec3 ImageColor = vec3(0.,0.,0.);
  vec3 color_B = mix(ImageColor, Brown, mixer.r);
  vec3 color_Y = mix(ImageColor, Yellow, mixer.g);
  vec3 color_L = mix(ImageColor, Blue ,mixer.b);

  ImageColor = mix(ImageColor,color_B, 0.5);
  ImageColor = mix(ImageColor, color_Y, 0.5);
  ImageColor = mix(ImageColor, color_L, 0.5);

	gl_FragColor = vec4(ImageColor, 1.0);
}