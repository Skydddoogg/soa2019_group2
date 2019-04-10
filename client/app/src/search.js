import React, { Component } from 'react';
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";

import ReactTable from "react-table";
import "react-table/react-table.css";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }
  render() {
    const { data } = this.state;
    return (
        <div className="Search">
            <header className="Search-header">
                <h1>ค้นหาคอร์สเรียน</h1>
                <div>
                    <ReactTable
                    data={data}
                    columns={[
                        {
                        Header: "ชื่ออาจารย์",
                        accessor: "name"
                        },
                        {
                        Header: "รายวิชา",
                        id: "subject",
                        accessor: d => d.subject
                        },
                        {
                        Header: "ระดับชั้น",
                        accessor: "level"
                        },
                        {
                        Header: "เวลาเริ่ม",
                        accessor: "startTime"
                        },
                        {
                        Header: "เวลาเลิก",
                        accessor: "endTime"
                        },
                        {
                        Header: "ราคาต่อชั่วโมง",
                        accessor: "price"
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    />
                </div>
            </header>
        </div>
    );
  }
}

export default Search;
