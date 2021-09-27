
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { apiProvider } from "../../../services/api";
import Dogs from "./Dogs";


// mock the useLocation() hook
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        state: {
            breed: "testing",
            maxPics: 5
        }
    })
}));

describe('Dog component', () => {
    test('renders a picture', async () => {
        // Arrange
        apiProvider.getPics = jest.fn();
        apiProvider.getPics.mockResolvedValueOnce(["https://images.dog.ceo/breeds/akita/An_Akita_Inu_resting.jpg"]);
        render(<Router><Dogs /></Router>);

        // Act
        // ... nothing

        // Assert
        // there should be an image for our fake dog
        const imageElement = await screen.findByAltText("undefined dog");
        expect(imageElement).toBeInTheDocument();
    });

    test('does not render loading message', async () => {
        // Arrange
        apiProvider.getPics = jest.fn();
        apiProvider.getPics.mockResolvedValueOnce(["https://images.dog.ceo/breeds/akita/An_Akita_Inu_resting.jpg"]);
        render(<Router><Dogs /></Router>);

        // Act
        // ... nothing

        // Assert
        // should not find the loading text
        const loadingElement = await screen.findByText("Loading, please wait", {exact:false});
        expect(loadingElement).not.toBeInTheDocument();
    });
});