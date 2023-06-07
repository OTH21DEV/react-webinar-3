import StoreModule from "../module";

/**
 * Profile state
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      userProfile: {},
      waiting: false,
    };
  }

  async getUserDataFromApi() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("api/v1/users/self", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });

      console.log(response);

      if (!response.ok) {
        this.handleError("");
      }

      const data = await response.json();
      console.log(data);

      if (data) {
        this.setState({
          ...this.getState(),
          userProfile: {
            name: data.result.profile.name,
            phone: data.result.profile.phone,
            email: data.result.email,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleError(errorMessage) {
    this.setState({ error: errorMessage });
  }
}

export default ProfileState;
