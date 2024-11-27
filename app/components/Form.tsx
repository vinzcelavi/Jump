import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from "react-hook-form";
import { type FormData, UserSchema, type ValidFieldNames } from "../types";
import FormField from "./FormField";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });
  const [pokemonList, setPokemonList] = useState<FormData[]>([]);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      // Make a POST request using fetch
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Parse the JSON response
      const responseData = await response.json();

      // Check if the response indicates success
      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      // Destructure the 'errors' property from the response data
      const { errors = {} } = responseData;

      // Define a mapping between server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        title: "title",
        email: "email",
        description: "description",
      };

      // Find the first field with an error in the response data
      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => errors[field]
      );

      // If a field with an error is found, update the form error state using setError
      if (fieldWithError) {
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError],
        });
      }
    } catch (error) {
      console.error("Submitting form failed:", error);
      alert("Submitting form failed!");
    }
    
    console.log('Success:', data);
    // Add new Pokémon to the list
    setPokemonList((prev) => [...prev, data]);

    // Reset the form
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-16 flex flex-col gap-2.5 max-w-[25rem]"
      >
        <div>
          <label htmlFor="title" className="flex mb-1 font-bold">Title</label>
          <FormField
            type="text"
            placeholder="Title"
            name="title"
            register={register}
            error={errors.title}
          />
        </div>

        <div>
          <label htmlFor="email" className="flex mb-1 font-bold">Email</label>
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />
        </div>

        <div>
          <label htmlFor="description" className="flex mb-1 font-bold">Description</label>
          <FormField
            type="text"
            placeholder="Description"
            name="description"
            register={register}
            error={errors.description}
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-3 font-semibold bg-green-700 text-white rounded cursor-pointer transition-colors duration-150 hover:bg-green-600"
        >
          Add Pokémon
        </button>
      </form>

      {pokemonList.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">Added Pokémon</h2>

          <ul className="list-none p-0">
            {pokemonList.map((pokemon) => (
              <li
                key={pokemon.title}
                className="mb-2 p-2 rounded shadow-md"
              >
                <strong>Title:</strong> {pokemon.title} <br />
                <strong>Email:</strong> {pokemon.email} <br />
                <strong>Description:</strong> {pokemon.description}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default Form;