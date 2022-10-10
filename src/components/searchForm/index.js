const SearchForm = (props) => {
  const { searchText, handleFilteredData } = props
  return (
    <div className="w-full xl:w-1/2 lg:w-1/2">
      <div className="relative rounded-md">
        <p style={{ fontSize: '20px' }}> Cari disini: </p>
        <input type="text" name="search" id="search" className="shadow focus:shadow-lg outline-none block w-full py-2 px-4 sm:text-sm border-gray-300 rounded-md" placeholder="Masukkan kata kunci: Komoditas, Provinsi, Kota, Ukuran, Harga" value={searchText} onChange={handleFilteredData} />
      </div>
    </div>
  )
}

export default SearchForm