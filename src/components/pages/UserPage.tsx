import Header from '../Header';
import UserCardText from '../userCard/UserCardText';
import { useGetSingleUserQuery } from '../../api/api';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import UserCardHeader from '../userCard/UserCardHeader';

const UserPage = () => {
  const params = useParams();

  const id = params.id ?? '';
  const validId = /^[1-9]+\d*$/.test(id);

  const index = validId ? parseInt(id) : null;

  const { user, isError } = useGetSingleUserQuery(index, {
    selectFromResult: ({ data, isError }) => ({
      user: data?.data,
      isError: isError,
    }),
  });

  if (!validId || isError) {
    return <NotFound />;
  }

  const email = user?.email ?? '';

  return (
    <>
      <Header>{user && <UserCardHeader user={user} />}</Header>
      <UserCardText email={email} />
    </>
  );
};

export default UserPage;
