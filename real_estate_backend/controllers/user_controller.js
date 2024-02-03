export function test(req, res) {
  res.json({ message: "Hello World" });
}

export function updateUser(req, res) {
  console.log(res, res, "Updateuser functionality");
}
