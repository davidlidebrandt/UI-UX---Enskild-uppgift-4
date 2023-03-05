import jsonwebtoken from "jsonwebtoken";

const USERNAME = "user";
const PASSWORD = "password";
const tokens = [];
const JWT_SECRET = "blahblahblahblahBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAAAA";
const FIVE_MINS = 5 * 60 * 1000;

export const login = (req, res) => {
	const authHeader = req.headers.authentication;
  const b64creds = authHeader.slice(6);
  const bufferedInput = Buffer.from(b64creds, "base64")
  const creds = bufferedInput.toString();
	const [user, password] = creds.split(":");
  
  if (user == USERNAME && password == PASSWORD) {
		const jwt = jsonwebtoken.sign(
			{
				username: user
			},
			JWT_SECRET,
			{ expiresIn: FIVE_MINS } 
		);
		tokens.push(jwt);
		return res.status(200).json({
			token: jwt
		});
	} else {
		return res
			.status(401)
			.json({ message: "The username and password you provided are invalid" });
	}
};

export const isAuthenticated = (req, res, next) => {
	const authHeader = req.headers.authentication;

  if (!authHeader) {
    return res.status(403).json({ error: "Forbidden" });
  }

	const token = authHeader.slice(7);
	
  jsonwebtoken.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Not allowed!" });
    } else {
      next();
    }
  });
};