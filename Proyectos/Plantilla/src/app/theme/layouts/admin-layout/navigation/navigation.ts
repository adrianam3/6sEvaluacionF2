export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  // {
    // id: 'dashboard',
    // title: 'Dashboard',
    // type: 'group',
    // icon: 'icon-navigation',
    // children: [
    //   {
    //     id: 'default',
    //     title: 'Default',
    //     type: 'item',
    //     classes: 'nav-item',
    //     url: '/dashboard/default',
    //     icon: 'dashboard',
    //     breadcrumbs: false
    //   }
    // ]
  // },
  /* {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'login',
        title: 'Login',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        icon: 'login',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Register',
        type: 'item',
        classes: 'nav-item',
        url: '/register',
        icon: 'profile',
        target: true,
        breadcrumbs: false
      }
    ]
  },*/
  {
    id: 'Componentes',
    title: 'Menú',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'tabler',
        title: 'Niños',
        type: 'item',
        classes: 'nav-item',
        url: '/ninos',
        icon: 'ant-design'
      }, //
      {
        id: 'tabler',
        title: 'Cuidadores',
        type: 'item',
        classes: 'nav-item',
        url: '/cuidadores',
        icon: 'ant-design'
      }, //
      {
        id: 'tabler',
        title: 'Asignaciones',
        type: 'item',
        classes: 'nav-item',
        url: '/asignaciones',
        icon: 'dashboard'
      }
    ]
  }
];
