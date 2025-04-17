export default function UserItem({ no, user }: { no: number; user: User }) {
  return (
    <div>
      <p>{no}</p>
      <p>{user.email}</p>
    </div>
  );
}
