import Header from '../Header';
import UserCardText from '../userCard/UserCardText';
import { useGetUsersQuery } from '../../api/api';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import UserCardHeader from '../userCard/UserCardHeader';

const UserPage = () => {
  const page = localStorage.getItem('page');
  const currentPage = page ? +page : 1;

  const { users, isError } = useGetUsersQuery(currentPage, {
    selectFromResult: ({ data, isError }) => ({
      users: data?.data,
      isError: isError,
    }),
  });

  const params = useParams();

  const id = params.id ?? '';
  const validId = /^[1-9]+\d*$/.test(id);

  if (!validId || isError || !users) {
    return <NotFound />;
  }

  const user = users.find((user) => user.id === parseInt(id));
  const email = user?.email ?? '';

  return (
    <>
      <Header>{user && <UserCardHeader user={user} />}</Header>
      <UserCardText email={email} />
    </>
  );
};

export default UserPage;
