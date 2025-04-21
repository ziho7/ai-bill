import Auth from '../../components/Auth'
import Account from '../../components/Account'
import { View } from 'react-native'
import { useAuth } from '../_layout'

export default function App() {
  const session = useAuth((state: any) => state.session)

  return (
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
  )
}