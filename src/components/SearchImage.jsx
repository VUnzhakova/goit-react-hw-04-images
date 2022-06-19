import { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import LoaderComponent from './LoaderComponent';
import Button from './Button';
import Modal from './Modal';

import { apiService } from './services/apiService';

import styles from './searchImage.module.css';

const SearchImage = () => {
  const [data, setData] = useState({
    images: [],
    loading: false,
    error: null,
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({
    open: false,
    content: null,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiService(page, search);
        setData(prevState => {
          return {
            images: [...prevState.images, ...data.hits],
            loading: false,
            error: null,
          };
        });
      } catch (error) {
        setData(prevState => ({
          ...prevState,
          loading: false,
          error: error.message,
        }));
      }
    };

    if (search) {
      fetchPosts();
      setData(prevState => ({
        ...prevState,
        loading: true,
      }));
    }
  }, [search, page]);

  const changeSearch = newSearch => {
    if (newSearch === search) {
      return;
    }
    setSearch(newSearch);
    setPage(1);
    setData(prevState => ({
      ...prevState,
      images: [],
    }));
  };

  const onLoadMore = useCallback(() => setPage(prevState => prevState + 1), []);

  const showModal = useCallback(content => {
    setModal({
      open: true,
      content,
    });
  }, []);

  const hideModal = () => {
    setModal({
      open: false,
      content: null,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <Searchbar onSubmit={changeSearch} />
      </div>
      {data.error && <p> Ошибка поиска</p>}
      {!data.images.length && search && !data.loading && !data.error && (
        <p>По запросу "{search}" ничего не найдено!</p>
      )}
      {modal.open && (
        <Modal handleClose={hideModal}>
          <div className={styles.imageBox}>
            <img src={modal.content.largeImageURL} alt={modal.content.alt} />
          </div>
        </Modal>
      )}
      {Boolean(data.images.length) && (
        <ImageGallery onOpenModal={showModal} images={data.images} />
      )}
      {data.loading && <LoaderComponent />}
      {!data.loading && data.images.length >= 12 && !data.error && (
        <Button onLoadMore={onLoadMore} text="Load more" />
      )}
      <ToastContainer autoClose={3700} />
    </div>
  );
};

export default SearchImage;
