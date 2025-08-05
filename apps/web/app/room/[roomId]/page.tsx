import axios from "axios";
async function getRoom() {}
export default async function ChatRoom({
  params,
}: {
  params: { slug: string };
}) {
  const roomId = (await params).slug;
}
