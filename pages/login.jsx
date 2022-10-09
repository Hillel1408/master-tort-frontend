import { Sidebar } from '../components/Sidebar';
import { HeaderBlock } from '../components/HeaderBlock';
import { Container } from '../components/styled/Container';
import { Content } from '../components/styled/Content';
import { Main } from '../components/styled/Main';

export default function Login() {
    return (
        <Container>
            <Sidebar />
            <Content>
                <HeaderBlock title={'Вход'} />
                <Main></Main>
            </Content>
        </Container>
    );
}
