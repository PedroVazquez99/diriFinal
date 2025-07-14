// tests/Login.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";

// 🧪 Mock authService
vi.mock("../services/AuthService", () => ({
    authService: {
        signIn: vi.fn(() => Promise.resolve({ user: { email: "nuevo@gmail.com" } })),
    },
}));

// 🧪 Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importActual) => {
    const actual = await importActual();
    return {
        // @ts-expect-error: spread requires object type
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("Login", () => {
    it("permite iniciar sesión y redirige a /home", async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const usernameInput = screen.getByPlaceholderText("Ingresa tu usuario");
        const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");
        const submitButton = screen.getByRole("button", { name: /Iniciar/i });

        fireEvent.change(usernameInput, { target: { value: "nuevo@gmail.com" } });
        fireEvent.change(passwordInput, { target: { value: "admin1234" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/home");
        });
    });
});
