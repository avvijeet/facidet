import "./App.css";
import React, { Component } from "react";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import FaceRecognition from "./components/faceRecognition/faceRecognition";
import SignIn from "./components/signIn/signIn";
import { clarifaiApp, Clarifai } from "./components/imageLinkForm/clarifai";
import Rank from "./components/rank/rank";
import Register from "./components/register/register";
import Particles from "react-particles-js";
import { backendUrl } from "./backend/server";
// import FaceRecognition from "./components/faceRecognition/faceRecognition"
const particleOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5,
      },
    },
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signIn",
      isSignedIn: false,
      user: {
        id: 0,
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (userData) => {
    this.setState({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFaceData =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFaceData.left_col * width,
      topRow: clarifaiFaceData.top_row * height,
      rightCol: width - clarifaiFaceData.right_col * width,
      bottomRow: height - clarifaiFaceData.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonDetect = () => {
    this.setState({
      imageUrl: this.state.input,
    });
    clarifaiApp.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        if (response) {
          fetch(`${backendUrl}/image`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((response) => {
              if (response.success === true) {
                this.setState(Object.assign(this.state.user, { entries: response.data.entries }));
              }
            });
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.error(err));
  };

  onRouteChange = (route) => {
    switch (route) {
      case "home":
        this.setState({ isSignedIn: true });
        break;
      case "signOut":
        this.setState({ isSignedIn: false });
        break;
      default:
        break;
    }
    this.setState({ route: route });
  };

  routeComponent = (route) => {
    switch (route) {
      case "signIn":
        return (
          <div>
            <SignIn
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />{" "}
          </div>
        );

      case "register":
        return (
          <div>
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        );

      case "home":
        return (
          <div>
            <Logo />
            <Rank
              userName={this.state.user.name}
              userEntries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonDetect={this.onButtonDetect}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        );

      default:
        return (
          <div>
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          </div>
        );
    }
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />

        {this.routeComponent(this.state.route)}
      </div>
    );
  }
}

export default App;
