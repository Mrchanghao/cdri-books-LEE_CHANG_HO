/**
 * SVG 모듈에 대한 TypeScript 선언
 *
 * @description
 * - SVG 파일을 React 컴포넌트로 import할 수 있도록 타입 정의
 * - @svgr/webpack과 함께 사용하여 SVG를 React 컴포넌트로 변환
 */

declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module "*.svg?url" {
  const content: string;
  export default content;
}
