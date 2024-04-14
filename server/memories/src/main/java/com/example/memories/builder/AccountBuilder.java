package com.example.memories.builder;

import com.example.memories.entity.RolesEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.Date;
import java.util.List;

/*
    @author Anh Dung
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ACCOUNTS")
public class AccountBuilder implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ACC_ID", nullable = false)
    private Long acc_id;

    @Column(name = "USER_NAME", nullable = false)
    private String name;

    @Column(name = "HASH_PASS", nullable = false)
    private String hashPassword;

    @Column(name = "PHONE_NUM")
    private Long phone_number;

    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "IS_ARCHIEVED")
    private int isArchieved;

    //MappyBy trỏ tới biến accounts ở trong roles
    @ManyToOne
    @JoinColumn(name = "ROLE_ID")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private RolesEntity roles;

    @Temporal(TemporalType.DATE)
    @Column(name = "CREATE_AT")
    private Date createAt;
    @Temporal(TemporalType.DATE)
    @Column(name = "UPDATE_AT")
    private Date updateAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(roles.getRoleName()));
    }

    @Override
    public String getPassword() {
        return hashPassword;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
