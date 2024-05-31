import GetUser from "../components/Dashboard/GetUser";
import Main from "../components/Dashboard/Main";

export default function Dashboard() {
  return <GetUser>{({ user }) => <Main user={user} />}</GetUser>;
}
