import StoreModule from "../module";
import { useNavigate } from "react-router-dom";

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

  //   async getTokenFromApi(login, password) {

  //     const rawResponse = await fetch("api/v1/users/sign", {
  //       //   await fetch("api/v1/users/sign", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ login: login, password: password }),
  //     });
  //     const content = await rawResponse.json();
  //     if (content) {
  //       let receivedToken = content.result.token;
  //       localStorage.setItem("token", `${receivedToken}`);

  //       console.log(receivedToken);

  //       console.log(content);

  //       this.setState({
  //           ...this.getState(),
  //           token: content.result.token,
  //           isLogged:true
  //         })
  //     } else {

  //       this.setState({
  //         ...this.getState(),
  //         token: '',
  //         isLogged:false
  //       })
  //     }
  //   }

  getTokenFromApi(login, password, navigate) {
    fetch("api/v1/users/sign", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: login, password: password }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          this.setState({
            ...this.getState(),
            error: "Неверное имя пользователя или пароль",
          });
        }
        return response.json();
      })

      .then((data) => {
        console.log(data.result.token);
        if (data.result.token) {
          let receivedToken = data.result.token;
          localStorage.setItem("token", `${receivedToken}`);
          navigate(`/profile`);
          this.setState({
            ...this.getState(),
            token: data.result.token,
            isLogged: true,
          });
        }
        // if(data.error?.message){
        //     console.log(data.error.message)
        // }
      })

      .catch((err) => {
        console.log(err.message);
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
            error: "Неверное имя пользователя или пароль",
          });
        }
        return response.json();
      })

      .then((data) => {
        console.log(data.result);
        // if (data.result.token) {
        //   let receivedToken = data.result.token;
        //   localStorage.setItem("token", `${receivedToken}`);
        //   navigate(`/profile`);
        this.setState({
          ...this.getState(),
          userName: data.result.profile.name,
          phone: data.result.profile.phone,
          email: data.result.email,
          isLogged: true,
        });
        // }
      })

      .catch((err) => {
        console.log(err.message);
      });
  }
}

export default UserState;
