import React from "react";
import Particles from "react-particles-js";

export default () => (
   
	< Particles
	      style={{
			position: "absolute",
			backgroundColor: "pink",
		    top: 0,
		    left: 0,
		    width: "100%",
		    height: "100%"
		  }}
    params={{
	    "particles": {
	        "number": {
	            "value": 200,
	            "density": {
	                "enable": false
	            }
            },
            color: {
                "color": "yellow"
            },
	        "size": {
	            "value": 3,
	            "random": true,
	            "anim": {
	                "speed": 4,
	                "size_min": 0.3
	            }
	        },
	        "line_linked": {
	            "enable": false
	        },
	        "move": {
	            "random": true,
	            "speed": 1,
	            "direction": "top",
	            "out_mode": "out"
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "bubble"
	            },
	            "onclick": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        },
	        "modes": {
	            "bubble": {
	                "distance": 300,
	                "duration": 2,
	                "size": 0,
	                "opacity": 0
	            },
	            "repulse": {
	                "distance": 400,
	                "duration": 4
	            }
	        }
	    }
	}} />
  );
  