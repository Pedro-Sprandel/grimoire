import User from "../../models/User.ts";

export const insertUser = async (username: string, email: string, password: string) => {
  const user = new User({ username, email, password});
  return await user.save();
};

type QueryCondition = { email?: string, username?: string };

export const findUserByEmailOrUsername = async (email?: string, username?: string) => {
  const query: QueryCondition[] = [];
  if (email) {query.push({ email });}
  if (username) {query.push({ username });}

  if (query.length === 0) {
    return null;
  }

  return await User.findOne({ $or: query });
};