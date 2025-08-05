export default async function Room({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  return (
    <div>
      <h1>You are in the room : {slug}</h1>
    </div>
  );
}

// TODO - inside this room =>
// fetch the messages from the http backend
// connect to the websocket backend
// let the user send messages and recieve
