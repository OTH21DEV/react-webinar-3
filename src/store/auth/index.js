import StoreModule from "../module";

class Auth extends StoreModule {
  initState() {
    return {
      isLogged: false,
      error: "",
      userName: "",
      
    };
  }
  resetState() {
    this.setState({
      ...this.getState(),
      isLogged: false,
      error: "",
      userName: "",
    });
  }

  getAuthStatus(token) {
    fetch("api/v1/users/self", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Token": `${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          this.setState({
            ...this.getState(),
            // error: response.error.data.issues[0].message,
            error: "",
          });
        }
        return response.json();
      })

      .then((data) => {
        console.log(data.result);

        this.setState({
          ...this.getState(),
          userName: data.result.profile.name,
       
          isLogged: true,
        });
        // }
      })

      .catch((err) => {
        console.log(err);
      });
  }








}

export default Auth;
