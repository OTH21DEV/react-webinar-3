import StoreModule from "../module";

/**
 * User auth state 
 */
class UserAuthState extends StoreModule {
  initState() {
    return {
      isLogged: false,
      error: "",
      waiting: false,
      user: {},
    };
  }
  async getAuthDetailsFromApi(login, password) {
    this.setState({ ...this.getState(), error: "", waiting: true });
    try {
      const response = await fetch("api/v1/users/sign", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const json = await response.json();
      if (json.result) {
        this.setState({
          ...this.getState(),
          waiting: false,
          isLogged: true,
          error: "",
          user: {
            name: json.result.user.profile.name,
          },
        });

        localStorage.setItem("token", json.result.token);
      } else if (json.error) {
        this.setState({
          ...this.getState(),
          waiting: false,
          isLogged: false,
          error: json.error.data.issues[0].message || json.error.message,
        });
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        isLogged: false,
        error: error.message,
      });
    }
  }

  logOut() {
    const token = localStorage.getItem("token");
    fetch("api/v1/users/sign", {
      method: "DELETE",
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
            error: "",
          });
        }
        return response.json();
      })

      .then((data) => {
        console.log(data);
        localStorage.clear();

        this.setState({
          ...this.getState(),
          waiting: false,
          user: {},
          isLogged: false,
          error: "",
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }

  checkIfAuth() {
    const token = localStorage.getItem("token");
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
        if (data) {
          console.log(data);

          this.setState({
            ...this.getState(),
            waiting: false,
            isLogged: true,
            user: {
              name: data.result.profile.name,
            },
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: "",
    });
  }
}

export default UserAuthState;
