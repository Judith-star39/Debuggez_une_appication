import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Home from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "conférence",
      title: "Event 1",
      cover: "images/test.png",
      description: "Description 1",
      date: "2022-01-01T00:00:00.000Z",
    },
    {
      id: 2,
      type: "soirée d'entreprise",
      title: "Event 2",
      cover: "images/test.png",
      description: "Description 2",
      date: "2022-04-01T00:00:00.000Z",
    },
  ],
  focus: [
    {
      title: "Focus Event",
      description: "Focus description",
      date: "2022-02-01T00:00:00.000Z",
      cover: "images/test.png",
    },
  ],
  people: [
    { firstname: "Samira", position: "CEO" },
    { firstname: "Jean-baptiste", position: "Directeur marketing" },
  ],
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  beforeEach(() => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
  });

 it("a list of events is displayed", async () => {
  render(
    <DataProvider>
      <Home />
    </DataProvider>
  );
  await screen.findByText("Event 1");
  await screen.findAllByText("Event 2");
});

  it("a list of people is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Samira");
    await screen.findByText("Jean-baptiste");
  });

  it("a footer is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Contactez-nous");
    await screen.findByText("Notre derniére prestation");
  });

  it("an event card, with the last event, is displayed", async () => {
  render(
    <DataProvider>
      <Home />
    </DataProvider>
  );
  const cards = await screen.findAllByText("Event 2");
  expect(cards.length).toBeGreaterThan(0);
  });
});