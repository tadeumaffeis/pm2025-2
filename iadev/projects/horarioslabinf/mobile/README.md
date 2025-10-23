# Horários Lab - Mobile App

Aplicação mobile React Native com Expo para o Sistema de Gerenciamento de Horários de Laboratório.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma para desenvolvimento React Native
- **React Navigation**: Navegação entre telas
- **Axios**: Cliente HTTP para comunicação com a API
- **Expo SecureStore**: Armazenamento seguro de tokens
- **Expo Vector Icons**: Ícones para a interface

## Funcionalidades

- **Autenticação**: Login seguro com armazenamento de token
- **Dashboard**: Visão geral do sistema com menu de navegação
- **Gerenciamento de Cursos**: CRUD completo de cursos
- **Interface Responsiva**: Adaptada para dispositivos móveis

## Como Executar

1. Certifique-se de ter o Node.js instalado
2. Instale o Expo CLI globalmente:
   ```bash
   npm install -g @expo/cli
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

5. Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR code, ou execute em um emulador:
   - Android: `npm run android`
   - iOS: `npm run ios` (apenas no macOS)
   - Web: `npm run web`

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── CursoModal.js   # Modal para adicionar/editar cursos
├── contexts/           # Contextos React
│   └── AuthContext.js  # Contexto de autenticação
├── screens/            # Telas da aplicação
│   ├── LoginScreen.js  # Tela de login
│   ├── DashboardScreen.js # Tela principal
│   └── CursoScreen.js  # Tela de gerenciamento de cursos
└── services/           # Serviços de API
    ├── authService.js  # Serviços de autenticação
    └── cursoService.js # Serviços de cursos
```

## Configuração da API

Por padrão, a aplicação se conecta à API em `http://localhost:3000/api/v1`. 

Para alterar a URL da API, modifique a constante `API_BASE_URL` nos arquivos de serviço em `src/services/`.

## Usuários de Teste

- **Admin**: admin / admin123
- **User**: user / user123

## Próximas Funcionalidades

- Gerenciamento de Laboratórios
- Gerenciamento de Professores
- Visualização de Horários
- Notificações Push
- Modo Offline