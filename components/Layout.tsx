import Header from "./Header";
import Meta from "./Meta";

export default function Layout(props) {
  return (
    <section className={"md:flex md:flex-row h-screen"}>
      <Meta
        siteTitle={props.siteTitle}
        siteDescription={props.siteDescription}
      />
      <Header siteTitle={props.siteTitle} />
      <div className="w-full overflow-auto">{props.children}</div>
    </section>
  );
}
