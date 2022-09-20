/*eslint comma-dangle: ["error", "always-multiline"]*/
import { Home, Briefcase, FilePlus } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home',
  },
  {
    id: 'tasks',
    title: 'Tasks',
    icon: <Briefcase size={20} />,
    navLink: '/tasks',
  },
  {
    id: 'postTask',
    title: 'Post Task',
    icon: <FilePlus size={20} />,
    navLink: '/postTask',
  },
]
