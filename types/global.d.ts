
// types/global.d.ts v1.0.4
// 临时类型声明文件，用于缓解缺少 node_modules 时的诊断问题

declare global {
  namespace React {
    type FC&lt;P = {}&gt; = (props: P) =&gt; any;
  }
}

declare module 'react' {
  export default React;
  export const FC: any;
}

declare module 'lucide-react';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

