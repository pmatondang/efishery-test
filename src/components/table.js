import { useState } from 'react'
import DataTable from 'react-data-table-component'
import { format } from 'date-fns/esm'
import getUnixTime from 'date-fns/getUnixTime'
import fromUnixTime from 'date-fns/fromUnixTime'
import { v4 as uuidv4 } from 'uuid'
import Modal from './modal'
import Alert from './alert'
import SearchForm from './searchForm'

const Table = (props) => {
  const [searchText, setSearchText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [komoditasValue, setKomoditasValue] = useState('')
  const [provinsiValue, setProvinsiValue] = useState('')
  const [kotaValue, setKotaValue] = useState('')
  const [ukuranValue, setUkuranValue] = useState('')
  const [hargaValue, setHargaValue] = useState('')

  const handleFilteredData = (event) => {
    const target = event.target
    setSearchText(target.value)
  }

  const filteredItems = () => {
    const { data } = props

    return data.filter(
      item =>
        (item.komoditas && item.komoditas.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.area_kota && item.area_kota.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.area_provinsi && item.area_provinsi.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.price && item.price.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.size && item.size.toLowerCase().includes(searchText.toLowerCase()))
    )
  }

  const formatDate = (date) => {
    return format(new Date(date), 'dd - MMMM - yyyy')
  }

  const getDate = () => {
    return getUnixTime(new Date())
  }

  const parseDate = (unixTime) => {
    return fromUnixTime(unixTime)
  }

  const handleModalOpen = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleAlertOpen = () => {
    setShowAlert(true)
  }

  const handleAlertClose = () => {
    setShowAlert(false)
  }

  const handleAddData = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value

    switch (name) {
      case 'komoditas':
        setKomoditasValue(value)
        break;
      case 'provinsi':
        setProvinsiValue(value)
        break;
      case 'kota':
        setKotaValue(value)
        break;
      case 'ukuran':
        setUkuranValue(value)
        break;
      case 'harga':
        setHargaValue(value)
        break;

      default:
        break;
    }
  }

  const handleAddButton = () => {
    let date = getDate()

    props.addFishData({
      uuid: uuidv4(),
      komoditas: komoditasValue,
      area_provinsi: provinsiValue,
      area_kota: kotaValue,
      size: ukuranValue,
      price: hargaValue,
      tgl_parsed: parseDate(date),
      timestamp: date,
    }).then(() => {
      handleAlertOpen()
      setShowAlert(true)
      setKomoditasValue('')
      setProvinsiValue('')
      setKotaValue('')
      setUkuranValue('')
      setHargaValue('')
      setInterval(() => {
        setShowAlert(false)
      }, 2000)
    })
  }

  const AddModal = () => {
    return (
      <Modal
        isOpened={showModal}
      >
        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-4 sm:align-middle max-w-lg w-full">
          <div className="bg-white px-4 pt-2 pb-2 sm:p-3 sm:pb-2">
            <div className="sm:flex sm:items-start py-0">
              <div className="mt-1 text-center sm:mt-0 sm:ml-2 sm:text-left w-full">
                <h3 className="text-left text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Tambah Komoditas
                </h3>
                <div className="mt-2">
                  <div className="w-full py-1 mb-1">
                    <label htmlFor="komoditas" className="text-left block text-sm font-medium text-gray-700">Komoditas</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input type="text" value={komoditasValue} onChange={(e) => handleAddData(e)} name="komoditas" id="komoditas" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-4 sm:text-sm border-gray-300 rounded-md" placeholder="Komoditas" />
                    </div>
                  </div>
                  <div className="w-full py-1 mb-1">
                    <label htmlFor="provinsi" className="text-left block text-sm font-medium text-gray-700">Provinsi</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input type="text" value={provinsiValue} onChange={(e) => handleAddData(e)} name="provinsi" id="provinsi" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-4 sm:text-sm border-gray-300 rounded-md" placeholder="Provinsi" />
                    </div>
                  </div>
                  <div className="w-full py-1 mb-1">
                    <label htmlFor="kota" className="text-left block text-sm font-medium text-gray-700">Kota</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input type="text" value={kotaValue} onChange={(e) => handleAddData(e)} name="kota" id="kota" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-4 sm:text-sm border-gray-300 rounded-md" placeholder="Kota" />
                    </div>
                  </div>
                  <div className="w-full py-1 mb-1">
                    <label htmlFor="ukuran" className="text-left block text-sm font-medium text-gray-700">Ukuran</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input type="text" value={ukuranValue} onChange={(e) => handleAddData(e)} name="ukuran" id="ukuran" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-4 sm:text-sm border-gray-300 rounded-md" placeholder="Ukuran" />
                    </div>
                  </div>
                  <div className="w-full py-1 mb-1">
                    <label htmlFor="harga" className="text-left block text-sm font-medium text-gray-700">Harga</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input type="text" value={hargaValue} onChange={(e) => handleAddData(e)} name="harga" id="harga" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-4 sm:text-sm border-gray-300 rounded-md" placeholder="Harga" />
                    </div>
                  </div>
                </div>
                <Alert isOpened={showAlert} status='success' message='Data berhasil ditambah.' onClose={(e) => handleAlertClose()} />
              </div>
            </div>
            <div className="px-2 py-0 sm:px-2 sm:my-4 sm:flex sm:flex-row-reverse">
              <button
                onClick={(e) => handleAddButton()}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-600 text-white font-medium text-gray-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Save
              </button>
              <button
                onClick={(e) => handleModalClose()}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  const layoutTableColumns = () => {
    return [
      {
        name: 'uuid',
        selector: 'uuid',
        omit: true,
        sortable: true
      },
      {
        name: 'Komoditas',
        selector: 'komoditas',
        sortable: true
      },
      {
        name: 'Provinsi',
        selector: 'area_provinsi',
        sortable: true
      },
      {
        name: 'Kota',
        selector: 'area_kota',
        sortable: true
      },
      {
        name: 'Ukuran',
        selector: 'size',
        sortable: true
      },
      {
        name: 'Harga',
        selector: 'price',
        sortable: true,
        cell: row => <p>Rp {Number(row.price).toLocaleString(['ban', 'id'])}</p>
      },
      {
        name: 'Tanggal Ditambahkan',
        selector: 'tgl_parsed',
        sortable: true,
        cell: row => <p>{formatDate(row.tgl_parsed)}</p>
      },
    ]
  }

  const layoutFilter = () => {
    return (
      <div className="w-full xl:flex-row lg:flex-row mb-4 xl:items-end lg:items-end justify-between pt-4">
        <p style={{ fontSize: '30px' }}> Data Harga Perikanan Indonesia </p>
        <p style={{ fontSize: '20px' }}> Kamu dapat menambahkan data baru disini</p>

        <button onClick={() => handleModalOpen()} class="bg-green-400 active:bg-red-500 text-white active:text-black py-2 px-4 mx-auto rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ..." type="button">
          Tambah Komoditas
        </button>
        <hr />

        <div className="w-full flex flex-col xl:flex-row lg:flex-row mb-4 items-start xl:items-end lg:items-end justify-between pt-4">
          <div className="flex items-center mb-4 xl:mb-0 lg:mb-0 md:w-full sm:w-full">
            <p style={{ fontSize: '25px', float: 'right' }}> Daftar Data Ikan </p>
          </div>
          <SearchForm
            searchText={searchText}
            handleFilteredData={(e) => handleFilteredData(e)}
          />
        </div>
      </div >
    )
  }

  return (
    <>
      <DataTable
        noHeader
        subHeader
        subHeaderComponent={layoutFilter()}
        columns={layoutTableColumns()}
        data={filteredItems()}
        pagination
        paginationTotalRows={filteredItems().length}
      />

      {AddModal()}
    </>
  )
}

export default Table