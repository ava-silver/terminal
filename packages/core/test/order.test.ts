import { expect, describe } from "bun:test";
import { withTestUser } from "./util";
import { Order } from "../src/order/order";
import { Card } from "../src/card";
import { Address } from "../src/address";
import { VisibleError } from "../src/error";

describe("order", () => {
  withTestUser("cannot create order with invalid variants", async (actor) => {
    const card = await Card.create({
      token: "tok_visa",
    });
    const address = await Address.create({
      name: "John Smith",
      zip: "33133",
      city: "Miami",
      country: "US",
      street1: "2800 SW 28th Terrace",
      province: "FL",
    });

    await expect(
      Order.create({
        cardID: card,
        addressID: address,
        variants: {
          "foo": 1,
          "bar": 2,
        },
      }),
    ).rejects.toThrow(
      new VisibleError("validation", "invalid_parameter", "No valid items in order"),
    );
  });
});
