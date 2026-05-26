export default function SearchBar({ search, setSearch }: any) {
  return (
    <div className="neo">
      <input
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}