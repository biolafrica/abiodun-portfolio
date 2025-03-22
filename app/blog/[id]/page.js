import Utterances from "@/app/components/common/utterances"
import { getBlogs } from "@/app/utils/database/getTasks"
import formatDate from "@/app/utils/common/fomatDate";
import SharePost from "@/app/components/common/share";
import getIndex from "@/app/utils/common/getIndex";
import Link from "next/link";

export default async function SelectedBlog({params}){
  const {id} = await params;
  const blogID = parseInt(id, 10);
  const blogs = await getBlogs();

  const{data, nextIndex, previousIndex} = getIndex(blogs, blogID);

  return(
    < div className="selected-blog-cont">
      {data && (

        <div className="blog-content-cont" key={data[0].id}>

          <div className="blog-content-image">
            <img src={`${data[0].image}`} alt={`${data[0].title} image`} />
          </div>

          <div className="blog-content-sub-content">

            <h4>
              <b>{data[0].title}</b>
            </h4>

            <h5>{data[0].excerpt}</h5>

            < div className="date-socials">
              <div className="date">
                <h6>{formatDate(data[0].created_at)}</h6>
                <h6>&bull; {data.read} minutes read</h6>
              </div>

              <SharePost blog={data}/>

            </div>
          

          </div>

          <div className="blog-content-content">
            <h5 style={{fontWeight: "300"}}>{data[0].content}</h5>
          </div>

          <div className="blog-content-footer">

            {previousIndex !== -1 && 
              (
                <Link href={`/blog/${blogs[previousIndex].id}`} className="last-post-cont">
                  <h6>Previous Blog</h6>
                  <div className="last-post-sub">
                    <h5>{blogs[previousIndex].title}</h5>
                    <h6>{formatDate(blogs[previousIndex].created_at)}</h6>
                  </div>

                </Link>

              )
            }


            {nextIndex <= (blogs.length-1) && 
              (

                <Link href={`/blog/${blogs[nextIndex].id}`} className="next-post-cont">
                  <h6>Next Post</h6>
                  <div className="last-post-sub">
                    <h5>{blogs[nextIndex].title}</h5>
                    <h6>{formatDate(blogs[nextIndex].created_at)}</h6>
                  </div>
                </Link>

              )
            }


          </div>

        </div>

      )}

    

      <div className="blog-comment-cont">
        <Utterances/>
        
      </div>
    </div>
  )
}