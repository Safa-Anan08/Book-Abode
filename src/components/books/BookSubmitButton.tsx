interface Props {
  loading: boolean;
  mode: "create" | "edit";
}

export default function BookSubmitButton({
  loading,
  mode,
}: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-[#261311] py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
    >
      {loading
        ? mode === "create"
          ? "Publishing..."
          : "Updating..."
        : mode === "create"
        ? "Publish Book"
        : "Update Book"}
    </button>
  );
}