import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    return {
      isLogged: false,
      error: "",
      userName: "",
      phone: "",
      email: "",
    };
  }
  resetError() {
    this.setState({
      ...this.getState(),
      error: "",
    });
  }

  // getTokenFromApi(login, password, navigate) {
  //   fetch("api/v1/users/sign", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ login: login, password: password }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         console.log(this.getState().count);
  //         return response.json().then((response) =>
  //           this.setState({
  //             ...this.getState(),
  //             error: response.error.data.issues[0].message,
  //           })
  //         );
  //       }

  //       return response.json();
  //     })

  //     .then((data) => {
  //       // console.log(data.result.token);
  //       if (data.result.token) {
  //         let receivedToken = data.result.token;
  //         localStorage.setItem("token", `${receivedToken}`);
  //         navigate(`/profile`);
  //         this.setState({
  //           ...this.getState(),
  //           // token: data.result.token,
  //           isLogged: true,
  //         });
  //       }
  //     })

  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }


  //test


  getTokenFromApi(login, password, navigate) {
    fetch("api/v1/users/sign", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: login, password: password }),
    })
      .then(async (response) => {
        if (!response.ok) {
         
          const response_1 = await response.json();
          return this.setState({
            ...this.getState(),
            error: response_1.error.data.issues[0].message,
          });
        }

        return response.json();
      })

      .then((data) => {
        console.log(data);
        if (data.result.token) {
          let receivedToken = data.result.token;
          localStorage.setItem("token", `${receivedToken}`);
          navigate(`/profile`);
          this.setState({
            ...this.getState(),
            // token: data.result.token,
            isLogged: true,
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });
  
  }

  getUserDataFromApi(token) {
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
        console.log(data);
if(data){
        this.setState({
          ...this.getState(),
          userName: data.result.profile.name,
          phone: data.result.profile.phone,
          email: data.result.email,
          isLogged: true,
          error: "",
        });
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }

  logOut(token) {
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
          userName: "",
          phone: "",
          email: "",
          isLogged: false,
          error: "",
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }
}

export default UserState;
