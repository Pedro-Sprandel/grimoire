import User from "../../models/User.ts";

export const insertUser = async (username: string, email: string, password: string) => {
  const user = new User({ username, email, password});
  return await user.save();
};

export const findUserByEmailOrUsername = async (email: string, username: string) => {
  return await User.findOne({ $or: [{ email }, { username }] });
};