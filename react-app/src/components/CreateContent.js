import React, { Component } from 'react';

class CreateContent extends Component {
    render() {
        return (
            <article>
                <h2>Create</h2>
                <form action="/create_process" method="POST" onSubmit={function (e) {
                    e.preventDefault();

                    alert('Submit!!!!!')
                }.bind(this)}>
                    <p>
                        <input type="text" name="title" placeholder="title" />
                    </p>
                    <p>
                        <textarea name="desc" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit" />
                    </p>
                </form>
            </article>
        );
    }
}

export default CreateContent;