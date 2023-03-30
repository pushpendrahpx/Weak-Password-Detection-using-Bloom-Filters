import React, { useState } from "react";
import "./Login.css";
import AppHeader from "./components/AppHeader";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeTook, setTimeTook] = useState(0);
  const [result, setResult] = useState(null);
  const onCheck = async (e) => {
    if (password.length === 0) {
      return;
    }
    try {
      let timeStart = new Date().getTime();
      setIsLoading(true);
      e.preventDefault();
      let response = await fetch(
        "https://weakpasswords.pushpendrahpx.me/check/" + password
      );
      let data = await response.json();
      setResult(data);
      setIsLoading(false);
      let timeTook = new Date().getTime() - timeStart;
      setTimeTook(timeTook);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const onChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="main">
      <AppHeader></AppHeader>
      <div className="container">
        <div className="largetitle">Is my Password Weak ?</div>
        <strong style={{ color: "#fff" }}>
          Check if your password is weak or not!
        </strong>
        <div className="formContainer">
          <form>
            <input
              required
              value={password}
              onChange={onChange}
              type="text"
              placeholder="type your password to check"
            />
            <button onClick={onCheck}>Check</button>
          </form>
        </div>
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            {result && (
              <>
                <div className="results">
                  <h4>
                    Results for "{result.item_id}" in {timeTook}ms
                  </h4>
                  <div>isWeak - {result.q ? "true" : "false"}</div>
                  <div>
                    detected_from -{" "}
                    {result.return_from == "db"
                      ? "database search"
                      : "BloomFilter"}
                  </div>
                  {result.return_from == "db" && (
                    <div>
                      false_positive -{" "}
                      {result.false_positive ? "true" : "false"}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
