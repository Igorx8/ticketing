import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("easy-tickets", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: 123,
    title: "ticket15",
    price: 25,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Message published");
  });
});
