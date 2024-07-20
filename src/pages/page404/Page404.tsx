
const Page404: React.FC = () => {
  return (
    <div className="w-full mx-auto text-center">
      <p className="font-bold text-4xl">404</p>
      <p className="text-2xl leading-10">File not found</p>
      <p className="text-2xl leading-10">The site configured at this address does not contain the requested file.</p>
      <p className="text-2xl leading-10">If this is your site, make sure that the filename case matches the URL as well as any file permissions.</p>
    </div>
  )
}

export default Page404;